# Pega a aimagem oficial do Maven com Eclipse Temurin 21 e Alpine Linux como base para construir a aplicação Java.
FROM maven:3.9-eclipse-temurin-21-alpine

# Cria a pasta app e define como diretório de trabalho para a aplicação.
WORKDIR /app

# Copia tudo que esta no diretorio atual para o diretório de trabalho dentro do container, ou seja, para a pasta /app. Isso inclui o código-fonte, arquivos de configuração e outros recursos necessários para a aplicação.
COPY . .

# Expoe para quer for ler que essa aplicacao esta ativa na porta 8080
EXPOSE 8080

# Expõe a porta 8080, que é a porta padrão para aplicações Spring Boot, permitindo que o container aceite conexões nessa porta.
# CMD ["mvn", "spring-boot:run"] // para producao em outro momento.