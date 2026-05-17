pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/YOUR_REPO/devops-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-node-app:v1 .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }

        stage('Restart Deployment') {
            steps {
                sh 'kubectl rollout restart deployment devops-node-app'
            }
        }
    }
}