# Build stage
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

# Másoljuk a Maven projekt fájlokat
COPY pom.xml .
COPY src ./src

# Buildeljük a jar-t
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Másoljuk át a jar-t a build stage-ből
COPY --from=build /app/target/*.jar app.jar

# Indítási parancs
ENTRYPOINT ["java", "-jar", "app.jar"]
