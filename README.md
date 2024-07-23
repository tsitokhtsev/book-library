[EN](#library-management-and-online-catalog-web-application) [KA](#ბიბლიოთეკების-მართვის-და-ონლაინ-კატალოგის-ვებ-აპლიკაცია)

# Library Management and Online Catalog Web Application

## Requirements

1. PHP >= 8.1 and its extensions with `php-mysql` [(docs)](https://laravel.com/docs/10.x/deployment#server-requirements)
2. Composer >= 2.2 [(link)](https://getcomposer.org/)
3. Node.js LTS and npm [(link)](https://nodejs.org/en)
4. Nginx web server
5. MySQL database

## Deployment

1. Configure Nginx using the file from the [docs](https://laravel.com/docs/10.x/deployment#nginx):
    - `server_name` - host (e.g. example.com)
    - `root` - path to the project's `public` folder
    - `fastcgi_pass` - update according to the PHP-FPM version
2. Install PHP dependencies: `composer install --optimize-autoloader`
3. Configure environment:
    - Create an ENV file: `cp .env.example .env`
    - Generate app key: `php artisan key:generate`
4. Configure database:
    - Adjust database credentials in the ENV file if needed: `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
    - Run database migrations: `php artisan migrate --seed`
5. Setup frontend:
    - Install Node dependencies: `npm install`
    - Install TypeScript: `npm install -g typescript`
    - Compile assets: `npm run build`
6. Disable "debug mode" in the ENV file: `APP_DEBUG=false`

## Demo

- Seed sample data: `php artisan db:seed --class=BookSeeder`
    - To log in as a super admin: test@example.com და option123
    - To log in as a member use: test1@exaple.com და option123
- Use `php artisan app:make-super-admin` command with an email of an existing user to make them a super user

<br />

# ბიბლიოთეკების მართვის და ონლაინ კატალოგის ვებ აპლიკაცია

## მოთხოვნები

1. PHP >= 8.1 და მისი გაფართოებები `php-mysql`-თან ერთად [(დოკუმენტაცია)](https://laravel.com/docs/10.x/deployment#server-requirements)
2. Composer >= 2.2 [(ბმული)](https://getcomposer.org/)
3. Node.js LTS და npm [(ბმული)](https://nodejs.org/en)
4. Nginx ვებ სერვერი
5. MySQL მონაცემთა ბაზა

## გაშვება

1. დააკონფიგურირე Nginx [დოკუმენტაციაში](https://laravel.com/docs/10.x/deployment#nginx) არსებული ფაილის გამოყენებით:
    - `server_name` - ჰოსტი (მაგ. example.com)
    - `root` - გზა პროექტის `public` საქაღალდესთან
    - `fastcgi_pass` - განაახლე PHP-FPM ვერსიის შესაბამისად
2. დააინსტალირე PHP-ს დამოკიდებულებები: `composer install --optimize-autoloader`
3. დააკონფიგურირე გარემო:
    - შექმენი ENV ფაილი: `cp .env.example .env`
    - დააგენერირე აპლიკაციის გასაღები: `php artisan key:generate`
4. დააკონფიგურირე მონაცემთა ბაზა:
    - საჭიროების შემთხვევაში შეცვალე მონაცემთა ბაზის მონაცემები ENV ფაილში: `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
    - გაუშვი მონაცემთა ბაზის მიგრაციები: `php artisan migrate --seed`
5. დააკონფიგურირე ფრონტ-ენდი:
    - დააინსტალირე Node-ს დამოკიდებულებები: `npm install`
    - დააინსტალირე TypeScript: `npm install -g typescript`
    - დააკომპილირე: `npm run build`
6. გამორთე "debug mode" ENV ფაილში: `APP_DEBUG=false`

## დემონსტრაცია

- სატესტო მონაცემების ჩაწერა: `php artisan db:seed --class=BookSeeder`
    - სუპერ ადმინად შესვლისთვის გამოიყენე: test@example.com and option123
    - მკითხველად შესვლისთვის გამოიყენე: test1@exaple.com and option123
- გამოიყენე `php artisan app:make-super-admin` ბრძანება არსებული მომხმარებლის ელ-ფოსტასთან ერთად მისი სუპერ ადმინად გადაკეთებისთვის
