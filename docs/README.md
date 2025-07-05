# System requriements

## Non functional requirements

Prevent malicious users from overloading the system resources with multiple writes to do the following:

- Implement Rate Limiting with AWS API Gateway usage plans. Use tokens to rate-limit or block abusers per user rather than just per IP.

- Add Backend Logic for Write Throttling
	•	In Lambda, store timestamps of user actions (e.g., comment time) in Redis/DynamoDB.
	•	Reject requests if:
	•	Too many writes in a short time (e.g., 5 likes in 2 seconds).
	•	Same user commenting too frequently.


Recommendations

For a React + AWS Lambda + Aurora app:
	•	Use API Gateway + WAF + usage plans.
	•	Cache reads in CloudFront or Redis.
	•	Authenticate users via Cognito or third-party OAuth (Google, GitHub).
	•	Throttle writes per user/IP at both API Gateway and backend.
	•	Log events and monitor via CloudWatch.


[AWS estimation](https://calculator.aws/#/estimate?id=d0265126f039780dd9bf56cb6edcdc3c763ec7f6)

[Link to chat](https://chatgpt.com/share/685f8ee1-0b88-8000-b05b-a67de9e5a024)