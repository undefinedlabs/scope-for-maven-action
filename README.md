# Scope for Maven Action

### Easy integration with Scope for Java projects based on Maven

>The latest release of this Action is based on Scope Jave Agent v0.2.2

## Usage

Add a step to your GitHub Actions workflow YAML that uses this action:

```yml
steps:
  - uses: actions/checkout@master
  - name: Set up JDK 1.8
    uses: actions/setup-java@v1
    with:
      java-version: 1.8 
  - name: Scope for Maven Action
    uses: undefinedlabs/scope-for-maven-action@v1.0.0
    with:
      dsn: ${{secrets.SCOPE_DSN}} #required
      run-tests: true #optional - default is 'true'
      command: mvn verify #optional - default is 'mvn verify'
```

> Note: This assumes that you've set your Scope DSN inside Settings > Secrets as `SCOPE_DSN`