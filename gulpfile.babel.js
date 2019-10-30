import gulp from 'gulp';
import { merge } from 'event-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const sourceFolder = 'src/assets/js/';
const distFolder = 'dist/assets/js';
const files = [
  'content-script.js',
  'popup.js',
  'options.js'
];

const buildDev = () => {
  const tasks = files.map(
    (file) => {
      let bundler = browserify({
        entries: `${sourceFolder}${file}`,
        debug: true
      });

      const bundle = () => bundler
        .transform('babelify', {
          sourceMaps: false,
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/transform-runtime']
          ],
          global: true,
          ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
          compact: false
        })
        .bundle()
        .on('error', (error) => {
          console.error(`Error: ${error.toString()}`);
        })
        .pipe(source(file))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(distFolder));

      bundler = watchify(bundler);

      bundler.on('update', () => {
        bundle();
        console.log(`Building ${sourceFolder}${file}...`);
      });

      bundler.on('bytes', (bytes) => {
        console.log(`${sourceFolder}${file} build finish! (Size: ${bytes / 1024}kb)`);
      });

      return bundle();
    }
  );

  return merge(...tasks);
};

const buildProd = () => {
  const tasks = files.map(
    file => browserify({
      entries: `${sourceFolder}${file}`
    })
      .transform('babelify', {
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/transform-runtime']
        ],
        comments: false,
        global: true,
        ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
        compact: false
      })
      .bundle()
      .on('error', (error) => {
        console.error(`Error: ${error.toString()}`);
      })
      .pipe(source(file))
      .pipe(buffer())
      .pipe($.uglify({
        mangle: false,
        output: {
          ascii_only: true
        }
      }))
      .pipe(gulp.dest(distFolder))
  );

  return merge(...tasks);
};

gulp.task('dev-js', (done) => {
  buildDev();
  done();
  console.log(`Watching ${sourceFolder}`);
});

gulp.task('build-js', (done) => {
  buildProd();
  done();
});
