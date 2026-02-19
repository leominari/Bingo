<script>
export default {
  methods: {
    //ex: CamelCase => Camel Case
    CamelCase2Space(string) {
      if (!string) return '';
      return string.replace(/([A-Z]+)/g, ' $1').replace(/^ /, '');
    },
    //ex: camelCase => camel Case
    camelCase2Space(string) {
      if (!string) return '';
      return string.replace(/([A-Z]+)/g, ' $1');
    }
  }
}
</script>
