FROM ruby:2.7-alpine

LABEL Name=callinggithub Version=0.0.1

RUN apk add --no-cache build-base gcc cmake git

EXPOSE 4000

WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 2.4.22 && bundle _2.4.22_ install

COPY . /srv/jekyll

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch"]
