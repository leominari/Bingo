<template>
  <div class="quick">

    <v-dialog
        v-model="confirmClear"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Tem certeza que deseja reiniciar o bingo?
        </v-card-title>

        <v-card-actions
            style="display: flex; justify-content: space-between;"
        >
          <v-btn
              color="red darken-1"
              text
              @click="confirmClear = false"
          >
            Cancelar
          </v-btn>

          <v-btn
              color="green darken-1"
              text
              @click="reiniciar(); confirmClear = false"
          >
            Limpar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="main">
      <div class="bingoSettings">
        <v-btn fab style="font-size: 1.2em" small @click="confirmClear = true">🔁</v-btn>
        <span>Quant. sorteados: {{ numerosSorteados.length }}</span>
        <v-btn fab style="font-size: 1.2em" small @click="sortear">{{ !rouletteTrigger ? '▶️' : '⏸️' }}</v-btn>
      </div>
      <div class="numeroSorteio">
        <h1>{{ numeroSorteado }}</h1>
      </div>

    </div>
    <div class="result">
      <div class="numerosSorteados">
        <div
            v-for="(numero, index) in numerosSorteados"
            :key="numero"
            :style="index === 0 ? 'background-color: #D0DCA9 !important;': ''"
            class="cardNumeroSorteado"
        >
          <span>{{ numero }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BingoView",
  components: {},
  data() {
    return {
      numerosSorteados: [],
      numeroMaximo: 79,
      numeroSorteado: 0,
      rouletteTrigger: false,
      confirmClear: false
    }
  },
  mounted() {
    this.numerosSorteados = window.localStorage.getItem('numerosSorteados') ? JSON.parse(window.localStorage.getItem('numerosSorteados')) : [];
    this.numeroSorteado = window.localStorage.getItem('numeroSorteado') ? JSON.parse(window.localStorage.getItem('numeroSorteado')) : 0;
  },
  methods: {
    sortear() {
      if (this.numerosSorteados.length === this.numeroMaximo) {
        this.rouletteTrigger = false
        this.numeroSorteado = 0
        return
      }

      if (!this.rouletteTrigger &&
          this.numerosSorteados.length > 0 &&
          this.numerosSorteados[this.numerosSorteados.length - 1] !== this.numeroSorteado
      ) {
        this.numerosSorteados.unshift(this.numeroSorteado)
      }

      if (this.numerosSorteados.length === 0 && this.numeroSorteado !== 0 && !this.rouletteTrigger) {
        this.numerosSorteados.unshift(this.numeroSorteado)
      }

      this.rouletteTrigger = !this.rouletteTrigger
      if (this.rouletteTrigger) {
        this.rouletteNumber()
      }
    },
    reiniciar() {
      this.rouletteTrigger = false
      this.numerosSorteados = []
      this.numeroSorteado = 0
      console.log('reiniciar', this.rouletteTrigger,
          this.numerosSorteados,
          this.numeroSorteado)
    },
    rouletteNumber() {
      setTimeout(() => {
        this.numeroSorteado = this.getRandomNumber()
        if (((this.numerosSorteados.length +1) !== this.numeroMaximo) && this.rouletteTrigger) {
          this.rouletteNumber()
        }
      }, 50)
    },
    getRandomNumber() {
      if (this.numerosSorteados.length === this.numeroMaximo) {
        return 0
      }

      let candidateNumber = Math.floor(Math.random() * this.numeroMaximo) + 1

      if (this.numerosSorteados.length < this.numeroMaximo && this.numerosSorteados.includes(candidateNumber)) {
        return this.getRandomNumber()
      }

      return candidateNumber
    }
  },
  watch: {
    numerosSorteados(value) {
      window.localStorage.setItem('numerosSorteados', JSON.stringify(value))
    },
    numeroSorteado(value) {
      window.localStorage.setItem('numeroSorteado', JSON.stringify(value))
    }
  }

};
</script>

<style lang="scss" scoped>
.quick {
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 6vh;
  width: 100%;
  height: 100%;
}

.bingoSettings {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
}

.result {
  display: flex;
}

.numeroSorteio {
  background-color: coral;
  padding: 20px;
  width: 600px;
  height: 600px;
  border-radius: 12px;

  h1 {
    font-size: 25em;
    text-align: center;
  }

}

.numerosSorteados {
  display: grid;
  grid-auto-rows: 120px;
  grid-template-columns: repeat(7, auto);
  gap: 10px;
}

.cardNumeroSorteado {
  background-color: #f5f5f5;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  span {
    font-weight: bold;
    font-size: 3em;
  }
}
</style>
