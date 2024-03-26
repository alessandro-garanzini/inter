# Utilizza l'immagine base di PHP 8.0 con Alpine
FROM php:8.0-fpm-alpine

# Installa le dipendenze
RUN apk --update add --no-cache \
    build-base \
    shadow \
    autoconf \
    gcc \
    musl-dev \
    make \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    mariadb-client \
    libzip-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd pdo_mysql mbstring zip exif pcntl

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Imposta la directory radice
WORKDIR /var/www/html


# Avvia il server PHP-FPM
CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000