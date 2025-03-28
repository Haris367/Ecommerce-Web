pipeline {
    agent any

    environment {
        EC2_HOST = '54.163.18.227'
        SSH_KEY = credentials('aws-ec2') // Replace 'ec2-ssh-key' with your Jenkins credential ID
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Haris367/Ecommerce-Web.git'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['aws-ec2']) {
                    sh '''
                    # Transfer files to EC2 instance
                    scp -r * ubuntu@${EC2_HOST}:/var/www/html

                    # Set proper permissions for the NGINX web root directory
                    ssh ubuntu@${EC2_HOST} "sudo chown -R www-data:www-data /var/www/html && sudo chmod -R 755 /var/www/html"

                    # Restart Nginx to reflect changes
                    ssh ubuntu@${EC2_HOST} "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
