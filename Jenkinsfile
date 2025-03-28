pipeline {
    agent any

    environment {
        EC2_IP = "54.163.18.227" // Replace with your EC2 instance IP
        EC2_USER = "ubuntu"          // Replace with your EC2 user
        SSH_CREDENTIALS_ID = "aws-ec2" // Replace with your SSH credentials ID
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'git@github.com:Haris367/Ecommerce-Web.git' // Replace with your repo details
            }
        }

        stage('Prepare Deployment') {
            steps {
                sh 'tar -czf app.tar.gz *'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS_ID]) {
                    sh """
                    scp app.tar.gz ${env.EC2_USER}@${env.EC2_IP}:/tmp/
                    ssh ${env.EC2_USER}@${env.EC2_IP} 'sudo mkdir -p /var/www/html && sudo tar -xzf /tmp/app.tar.gz -C /var/www/html/'
                    """
                }
            }
        }

        stage('Restart Web Server') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS_ID]) {
                    sh """
                    ssh ${env.EC2_USER}@${env.EC2_IP} 'sudo systemctl restart nginx || sudo systemctl restart apache2'
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
