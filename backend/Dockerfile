FROM php:8.0-fpm-alpine

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


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY ./src .

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install --no-scripts

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000