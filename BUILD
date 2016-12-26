#Build "polymer_element"
load('@polymerize//:polymerize.bzl', 'polymer_library')

package(default_visibility=['//visibility:public'])

#filegroup(name = "polymer_element", srcs=glob(["lib/**/*.dart"]))

polymer_library(
  name = 'polymer_element',
  deps = ['@js//:js'],
  dart_sources = glob(['lib/**/*.dart']),
  base_path = "//:lib",
  external = 1,
  html_templates = glob(['lib/**'],exclude=['lib/**/*.dart']),
  package_name = 'polymer_element', #Cippa Lippa
  version = '0.1.0+1')
