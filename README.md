![logo](scope_logo.png)

# Scope for Maven Action

GitHub Action to run your tests automatically instrumented with the [Scope Java agent](http://home.undefinedlabs.com/goto/java-agent).

## About Scope

[Scope](https://scope.dev) gives developers production-level visibility on every test for every app – spanning mobile, monoliths, and microservices.

## Usage

1. Set Scope DSN inside Settings > Secrets as `SCOPE_DSN`.
2. Add a step to your GitHub Actions workflow YAML that uses this action:

```yml
steps:
  - uses: actions/checkout@master
  - name: Set up JDK 1.8
    uses: actions/setup-java@v1
    with:
      java-version: 1.8 
  - name: Scope for Maven Action
    uses: undefinedlabs/scope-for-maven-action@v1
    with:
      dsn: ${{secrets.SCOPE_DSN}} # required
      run-tests: true # optional - default is 'true'
      command: mvn verify # optional - default is 'mvn verify'
```