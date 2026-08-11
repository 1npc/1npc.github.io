# based on https://distresssignal.org/busting-css-cache-with-jekyll-md5-hash
# https://gist.github.com/BryanSchuetz/2ee8c115096d7dd98f294362f6a667db
module Jekyll
  module CacheBust
    class CacheDigester
      require 'digest/md5'
      require 'pathname'

      attr_accessor :file_name, :directory

      def initialize(file_name:, directory: nil)
        self.file_name = file_name
        self.directory = directory
      end

      def digest!
        [file_name, '?', Digest::MD5.hexdigest(file_contents)].join
      end

      private

      # `directory` may be a single path or a list of paths. Files are sorted so
      # the digest is reproducible, and read as binary so a stray .DS_Store
      # cannot blow up the join with an encoding error.
      def directory_files_content
        Array(directory)
          .flat_map { |dir| Dir[File.join(dir, '**', '*')] }
          .reject { |f| File.directory?(f) }
          .sort
          .map { |f| File.binread(f) }
          .join
      end

      def file_content
        local_file_name = file_name.slice((file_name.index('assets/')..-1))
        File.read(local_file_name)
      end

      def file_contents
        is_directory? ? file_content : directory_files_content
      end

      def is_directory?
        directory.nil?
      end
    end

    def bust_file_cache(file_name)
      CacheDigester.new(file_name: file_name, directory: nil).digest!
    end

    # The stylesheet is compiled from _sass/** plus assets/css/main.scss. The
    # original 'assets/_sass' path does not exist in this project, so the glob
    # matched nothing and every build emitted MD5("") — a constant query string
    # that never busted anything. Digest what main.css is actually built from.
    def bust_css_cache(file_name)
      CacheDigester.new(file_name: file_name, directory: ['_sass', 'assets/css']).digest!
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBust)