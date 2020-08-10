pipeline { 
    agent any 
    
    stages {
        stage('Build') { 
            steps { 
                sh 'npm installyarn danger pr' 
                echo 'Build'
            }
        }
        stage('Test'){
            steps {
                sh 'make check'
                junit 'reports/**/*.xml' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'make publish'
            }
        }
    }
}