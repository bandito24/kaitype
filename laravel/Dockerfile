#FROM php:8.1.0-apache
#WORKDIR /var/www/html
#
#RUN a2enmod rewrite
#
#
#
#RUN apt-get update -y && apt-get install -y \
#    libicu-dev \
#    libmariadb-dev \
#    unzip zip \
#    zlib1g-dev \
#    libpng-dev \
#    libjpeg-dev \
#    libfreetype6-dev \
#    libjpeg62-turbo-dev \
#    libpng-dev
#
## Composer
#COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
#
## PHP Extension
#RUN docker-php-ext-install gettext intl pdo_mysql gd
#
#RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
#    && docker-php-ext-install -j$(nproc) gd
#
##RUN pecl install xdebug
##RUN docker-php-ext-enable xdebug
#
##RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini
##RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini
##RUN echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini
#
##RUN COMPOSER_ALLOW_XDEBUG=0 composer install
#
#
#WORKDIR /app
#
#COPY . /app
#
#RUN composer install
#
#
#
#EXPOSE 8000
## CMD php artisan serve --host=0.0.0.0 --port=8000
#










FROM php:8.1.0-apache
WORKDIR /var/www/html

#ENV COMPOSER_ALLOW_SUPERUSER=1


RUN a2enmod rewrite
RUN apt-get update -y && apt-get install -y \
    libicu-dev \
    libmariadb-dev \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev
RUN docker-php-ext-install gettext intl pdo_mysql gd



WORKDIR /app
COPY . /app


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

#RUN pecl install xdebug \
#    && docker-php-ext-enable xdebug





EXPOSE 8000
# CMD php artisan serve --host=0.0.0.0 --port=8000
