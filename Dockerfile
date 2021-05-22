FROM jekyll/jekyll:3.0.5

LABEL Name=callinggithub Version=0.0.1

EXPOSE 4000

WORKDIR /srv/jekyll
COPY . /srv/jekyll

COPY Gemfile Gemfile.lock ./
RUN bundle install

CMD ["jekyll", "serve --watch"]
