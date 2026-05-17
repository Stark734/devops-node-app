pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        IMAGE_TAG = "v1"
        CONTAINER_NAME = "devops-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-node-app:v1 .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker rm -f devops-app || exit 0'
                bat 'docker run -d -p 3000:3000 --name devops-app devops-node-app:v1'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl apply -f service.yaml'
                bat 'kubectl rollout restart deployment --all'
            }
        }

        stage('Verify Pods') {
            steps {
                bat 'kubectl get pods'
            }
        }
    }

    post {
        success {
            echo "🚀 FULL CI/CD PIPELINE SUCCESS"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}