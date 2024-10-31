# Stage 1: Build the application
FROM gradle:8.3-jdk17 AS build

# Copy the project files
COPY --chown=gradle:gradle . /home/gradle/src

# Set the working directory
WORKDIR /home/gradle/src

# Build the project without running tests
RUN gradle build --no-daemon -x test

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

# Create a directory for the application
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

# Expose port 8080
EXPOSE 8080

# Define the entry point
ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]


#FROM openjdk:17-jdk-slim
#COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]