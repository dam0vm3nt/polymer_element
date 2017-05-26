class Metadata {
  List<String> observedPaths;

  Metadata({this.observedPaths});
}

MetadataRegistry metadataRegistry = new MetadataRegistry._();

class MetadataRegistry {
  Map<String,Metadata> _data = <String,Metadata>{};

  MetadataRegistry._();

  void registerMetadata(String tag,Metadata metadata) {
    _data[tag.toUpperCase()] = metadata;
  }

  // Get metadata for
  Metadata operator[](String type) => _data[type.toUpperCase()];
}