FROM jenkins/jenkins:lts

USER root

RUN apt update && \
    apt install -y nodejs npm docker.io kubectl

USER jenkins