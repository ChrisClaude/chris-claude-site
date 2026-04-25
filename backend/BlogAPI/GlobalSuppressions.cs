using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Application.IntegrationTests")]

// Hot Chocolate instantiates query/mutation/extension types via reflection
[assembly: SuppressMessage("CodeQuality", "CA1812:Avoid uninstantiated internal classes",
    Justification = "Hot Chocolate instantiates GraphQL types via reflection",
    Scope = "module")]

// GraphQL input/output types must be public for Hot Chocolate schema inference
[assembly: SuppressMessage("Design", "CA1515:Because an application's API isn't typically referenced from outside the assembly, types can be made internal",
    Justification = "Hot Chocolate requires public types for schema inference",
    Scope = "module")]

// GraphQL type extension classes use only static resolver methods by design; HC does not require instantiation
[assembly: SuppressMessage("csharpsquid", "S1118:Utility classes should not have public constructors",
    Justification = "Hot Chocolate GraphQL type extension classes intentionally use static resolvers",
    Scope = "module")]

// HC resolver parameters annotated with [Service] are injected by HotChocolate from the DI container
// and are guaranteed non-null at runtime. Null validation in resolver bodies is not required.
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods",
    Justification = "Hot Chocolate injects [Service] resolver parameters from DI; they are guaranteed non-null at runtime",
    Scope = "module")]
