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
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-node-app:v1 .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker rm -f devops-app || true'
                sh 'docker run -d -p 3000:3000 --name devops-app devops-node-app:v1'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
                sh 'kubectl rollout restart deployment devops-node-app'
            }
        }

        stage('Verify Pods') {
            steps {
                sh 'kubectl get pods'
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