# Базовый образ PHP с FPM (PHP 8.2)
FROM php:8.2-fpm

# Установка системных зависимостей и расширений PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    gnupg \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        gd \
        zip \
        bcmath \
        pcntl \
        exif \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка Node.js 20.x (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Рабочая директория
WORKDIR /var/www

# Копирование файлов зависимостей
COPY composer.* ./
COPY package*.json ./

# Установка PHP зависимостей
RUN composer install --no-dev --optimize-autoloader \
    --no-interaction --no-progress --prefer-dist

# Установка Node.js зависимостей
RUN npm install --silent --no-progress

# Копирование всего проекта
COPY . .

# Сборка фронтенда
RUN npm run build

# Настройка прав доступа для Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache \
    && php artisan storage:link

# Переменные окружения для production
ENV APP_ENV=production
ENV APP_DEBUG=false

EXPOSE 9000

CMD ["php-fpm"]
