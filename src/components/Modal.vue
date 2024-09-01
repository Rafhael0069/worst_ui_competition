<template>
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ country.index !== undefined ? 'Editar' : 'Adicionar' }} País
          </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="country.name"
              label="Nome"
              required
              @input="handleInput('name')"
            ></v-text-field>
            <v-text-field
              v-model.number="country.gold"
              label="Ouro"
              type="number"
              hide-spin-buttons
              min="0"
              required
              @input="handleInput('gold')"
            ></v-text-field>
            <v-text-field
              v-model.number="country.silver"
              label="Prata"
              type="number"
              hide-spin-buttons
              min="0"
              required
              @input="handleInput('silver')"
            ></v-text-field>
            <v-text-field
              v-model.number="country.bronze"
              label="Bronze"
              type="number"
              hide-spin-buttons
              min="0"
              required
              @input="handleInput('bronze')"
            ></v-text-field>
          </v-form>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Cancelar</v-btn>
          <v-btn color="primary" @click="submitForm">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref, watchEffect } from 'vue';
  import { invertInput } from '../utils/invertInput.js';
  
  export default {
    name: 'Modal',
    props: {
        country: Object,
    },
    setup(props, { emit }) {
      const showDialog = ref(true);
      const country = ref({ ...props.country });
      const previousText = ref(country.value.name || '');
      const previousGold = ref(country.value.gold || '');
      const previousSilver = ref(country.value.silver || '');
      const previousBronze = ref(country.value.gold || '');
  
      watchEffect(() => {
        country.value = { ...props.country };
        previousText.value = props.name || '';
        previousGold.value = props.gold || '';
        previousSilver.value = props.silver || '';
        previousBronze.value = props.bronze || '';
      });

      const handleInput = (field) => {
        if (field === 'name') {
            const currentText = country.value[field];
            const prevText = previousText.value;

            if (currentText.length > prevText.length) {
                const lastChar = currentText[currentText.length - 1];
                const invertedChar = invertInput(lastChar);
                country.value[field] = currentText.slice(0, -1) + invertedChar;
            }

            previousText.value = country.value[field];
        } else if (field === 'gold') {
        const currentNumber = country.value[field].toString();
        const prevNumber = previousGold.value.toString();

        if (currentNumber.length > prevNumber.length) {
          const lastChar = currentNumber[currentNumber.length - 1];
          const invertedChar = invertInput(lastChar);
          country.value[field] = parseInt(currentNumber.slice(0, -1) + invertedChar, 10);
        }
        previousGold.value = country.value[field];
      } else if (field === 'silver') {
        const currentNumber = country.value[field].toString();
        const prevNumber = previousSilver.value.toString();

        if (currentNumber.length > prevNumber.length) {
          const lastChar = currentNumber[currentNumber.length - 1];
          const invertedChar = invertInput(lastChar);
          country.value[field] = parseInt(currentNumber.slice(0, -1) + invertedChar, 10);
        }
        previousSilver.value = country.value[field];
      } else if (field === 'bronze') {
        const currentNumber = country.value[field].toString();
        const prevNumber = previousBronze.value.toString();

        if (currentNumber.length > prevNumber.length) {
          const lastChar = currentNumber[currentNumber.length - 1];
          const invertedChar = invertInput(lastChar);
          country.value[field] = parseInt(currentNumber.slice(0, -1) + invertedChar, 10);
        }
        previousBronze.value = country.value[field];
      }
        
      };
  
      const close = () => {
        emit('close');
        showDialog.value = false;
      };
  
      const submitForm = () => {
        emit('save', country.value);
        close();
      };
  
      return {
        showDialog,
        country,
        handleInput,
        close,
        submitForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-card-title {
    font-weight: bold;
  }
  </style>
  