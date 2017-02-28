# Polymer 2.0 support for Dart-DDC

This package contains the `polymer 2.0-preview` runtime for projects based on
[polymerize](https://pub.dartlang.org/packages/polymerize) tool and relate [bazel](http://bazel.build) [rules for polymerize Dart](https://github.com/dam0vm3nt/bazel_polymerize_rules). 

To use this package in your bazel polymerize project add the following lines to your `WORKSPACE` file :

    dart_library(
     name='js',
     package_name='js',
     version='0.6.1',
     download = 1)

    dart_library(
     name='polymer_element',
     deps= ['@js//:js'],
     src_path='/home/vittorio/Develop/dart/polymer_element',
     package_name='polymer_element',
     download = 1,
     version='0.1.0')


And then in the `BUILD` file of any modules (e.g. `my_module`) that is using it declare a dependency to `@polymer_element//:polymer_element` and `@js//:js`, for example :

    polymer_library(
     name='my_module',
     deps=[
      '@polymer_element//:polymer_element',
      '@js//:js' ],
     package_name = 'my_module',
     version = '1.0',
     base_path = '//:lib',
     dart_sources= glob(['lib/**/*.dart']),
     html_templates= glob(['lib/**','web/**'],exclude=['**/*.dart']))

More information on how to build polymer 2.0 with dart-ddc and `polymerize` can be found in the polymerize project home page.
