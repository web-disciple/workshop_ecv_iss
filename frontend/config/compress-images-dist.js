//script to compress images of "dev/imgs/*" to "dist/imgs/*"

var compress_images = require('compress-images'), INPUT_path_to_your_images, OUTPUT_path;

INPUT_path_to_your_images = '_dev/ressources/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
OUTPUT_path = 'dist/ressources/images/';

compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
  { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
  { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
  { svg: { engine: 'svgo', command: '--multipass' } },
  { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }, function (error, completed, statistic) {
    if (error != null) {
      console.log("error : ", error);
    }
    if (completed) {
      console.log("Le script de compression d'images a fonctionné. ✔️");
    }
    else {
      console.log("le script de compression d'images a échoué. ❌")
    }
    if (statistic != undefined) {
      console.log('-------------');
      console.log("Données optimisées :");
      console.log(statistic)
      console.log('-------------');
    }
    else {
      console.log("Aucune donnée n'a été optimisée.")
    }
  });