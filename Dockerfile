FROM openjdk:19

ENV ENVIROMENT=prod

MAINTAINER NICK KLOCKGETHER <klockgether.nick@gmail.com>

EXPOSE 8080

ADD backend/target/app.jar app.jar

CMD [ "sh","-c","java -jar /app.jar" ]