terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5" }
  }
}

provider "aws" {
  region = var.aws_region
}

# ───────────────────────────────── ①  Cognito  ─────────────────────────────────
module "auth" {
  source         = "../modules/api/aws"
  user_pool_name = "${var.project}-pool"
}

# ───────────────────────────────── ②  Lambda  ──────────────────────────────────
resource "aws_lambda_function" "blog_api" {
  function_name = "${var.project}-api"
  runtime       = "dotnet8"
  handler       = "BlogApi::BlogApi.LambdaEntryPoint::FunctionHandlerAsync"
  role          = aws_iam_role.lambda_exec.arn
  filename      = "${path.module}/lambda_build/blog.zip" # <- your compiled zip
  memory_size   = 512
  timeout       = 15
}

# Minimal execution role
resource "aws_iam_role" "lambda_exec" {
  name               = "${var.project}-lambda-exec"
  assume_role_policy = data.aws_iam_policy_document.lambda_trust.json
}

data "aws_iam_policy_document" "lambda_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# ──────────────────────────────── ③  API Gateway ───────────────────────────────
resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.project}-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.blog_api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# ──────────────────────────────── ④  Aurora Serverless v2 ──────────────────────
resource "aws_rds_cluster" "aurora" {
  cluster_identifier = "${var.project}-aurora"
  engine             = "aurora-postgresql"
  engine_mode        = "provisioned" # still required
  engine_version     = "15.4"
  database_name      = "blogdb"
  master_username    = var.db_admin_user
  master_password    = var.db_admin_pass
  storage_encrypted  = true

  serverlessv2_scaling_configuration { # ◀ serverless-v2
    min_capacity = 0.5
    max_capacity = 2
  }
}

# ──────────────────────────────── ⑤  DynamoDB views table ──────────────────────
resource "aws_dynamodb_table" "post_views" {
  name         = "${var.project}-views"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PostId"
  range_key    = "ViewId"

  attribute {
    name = "PostId"
    type = "S"
  }

  attribute {
    name = "ViewId"
    type = "S"
  }

  ttl {
    attribute_name = "ExpireAt"
    enabled        = true
  }
}
