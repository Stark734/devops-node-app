pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        IMAGE_TAG = "v1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning code from GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node dependencies..."
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Run Container (Test)') {
            steps {
                echo "Running container..."
                sh "docker rm -f devops-app || true"
                sh "docker run -d -p 3000:3000 --name devops-app ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes..."
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
            }
        }

        stage('Restart Deployment') {
            steps {
                echo "Restarting deployment..."
                sh "kubectl rollout restart deployment devops-node-app"
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESS 🚀 App deployed successfully"
        }

        failure {
            echo "Pipeline FAILED ❌ Check logs"
        }
    }
}