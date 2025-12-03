FROM gradle:8.8-jdk21-alpine
WORKDIR /app
COPY . .
RUN gradle clean build --no-daemon
EXPOSE 8080
CMD ["java", "-jar", "build/libs/brilliant-0.0.1-SNAPSHOT.jar"]