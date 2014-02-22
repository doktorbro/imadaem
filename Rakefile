require 'rake'
require 'html/proofer'

namespace :site do
  desc "Commit the local site to the gh-pages branch and publish to GitHub Pages"
  task :publish do
    # Ensure the gh-pages dir exists so we can generate into it.
    puts "Checking for gh-pages dir..."
    unless File.exist?("./gh-pages")
      puts "No gh-pages directory found. Run the following commands first:"
      puts "  `git clone git@github.com:penibelst/imadaem gh-pages"
      puts "  `cd gh-pages"
      puts "  `git checkout gh-pages`"
      exit(1)
    end

    # Ensure gh-pages branch is up to date.
    Dir.chdir('gh-pages') do
      sh "git pull origin gh-pages"
    end

    # Copy to gh-pages dir.
    puts "Copying site to gh-pages branch..."
    Dir.glob("site/*") do |path|
      next if path.include? "_site"
      sh "cp -R #{path} gh-pages/"
    end

    # Commit and push.
    puts "Committing and pushing to GitHub Pages..."
    sha = `git log`.match(/[a-z0-9]{40}/)[0]
    Dir.chdir('gh-pages') do
      sh "git add ."
      sh "git commit -m 'Update to #{sha}'"
      sh "git push origin gh-pages"
    end
    puts 'Done.'
  end

  desc 'Test the site with Proofer'
  task :test do
    Dir.chdir('site') do
      sh 'bundle exec jekyll build --trace'
      HTML::Proofer.new('./_site').run
    end
  end
end
