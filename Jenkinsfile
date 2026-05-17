pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        IMAGE_TAG = "v1"
        CONTAINER_NAME = "devops-app"
        DEPLOYMENT_NAME = "devops-node-app"
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
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Run Container (Local Test)') {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
                sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
            }
        }

        stage('Restart Kubernetes Deployment') {
            steps {
                sh "kubectl rollout restart deployment ${DEPLOYMENT_NAME}"
            }
        }

        stage('Verify Pods') {
            steps {
                sh "kubectl get pods"
            }
        }
    }

    post {
        success {
            echo "🚀 FULL CI/CD PIPELINE SUCCESS"
        }

        failure {
            echo "❌ Pipeline Failed — check logs"
        }
    }
}