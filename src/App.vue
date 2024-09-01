<template>
  <v-container class="text-center">
    <v-card>
      <v-card-title>
        <h1 class="text-h4">Olimpíadas</h1>
        <h1 class="text-h4">sadaípmilO</h1>
      </v-card-title>

      <v-card-actions>
        <v-btn variant="outlined" color="primary" @click="openModal()">Adicionar Nova Pontuação</v-btn>
      </v-card-actions>

      <v-data-table
        :headers="headers"
        :items="countries"
        class="elevation-1"
        style="color: #424242;"
        :items-per-page="10"
      >
        <!-- Custom Header Slots -->
        <template v-slot:header.name>
          <div class="text-start">
            País
          </div>
        </template>
        <template v-slot:header.gold>
          <div class="text-end">
            <v-icon left style="color: #FFD700;">mdi-medal</v-icon> Ouro
          </div>
        </template>
        <template v-slot:header.silver>
          <div class="text-end">
            <v-icon left style="color: #C0C0C0;">mdi-medal</v-icon> Prata
          </div>
        </template>
        <template v-slot:header.bronze>
          <div class="text-end">
            <v-icon left style="color: #CD7F32;">mdi-medal</v-icon> Bronze
          </div>
        </template>
        <template v-slot:header.total>
          <div class="text-end">
            Total
          </div>
        </template>
        <template v-slot:header.action>
          <div class="text-end">
            Ações
          </div>
        </template>

        <template v-slot:item.name="{ item }">
          <div class="text-start">{{ item.name }}</div>
        </template>
        <template v-slot:item.gold="{ item }">
          <div class="text-end">{{ item.gold }}</div>
        </template>
        <template v-slot:item.silver="{ item }">
          <div class="text-end">{{ item.silver }}</div>
        </template>
        <template v-slot:item.bronze="{ item }">
          <div class="text-end">{{ item.bronze }}</div>
        </template>
        <template v-slot:item.total="{ item }">
          <div class="text-end">{{ item.total }}</div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="text-end">
            <v-btn variant="outlined" icon @click="openModal(item)" color="primary">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </div>
        </template>
      </v-data-table>

    </v-card>

    <Modal
      v-if="showModal"
      :country="selectedCountry"
      @close="closeModal"
      @save="saveCountry"
    />
  </v-container>
</template>

<script>
import { ref } from 'vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: { Modal },
  setup() {
    const countries = ref([]);

    const showModal = ref(false);
    const selectedCountry = ref(null);

    const sortCountries = () => {
      countries.value.sort((a, b) => b.gold - a.gold);
    };

    // Classifique a lista ao iniciar
    sortCountries();

    const headers = [
      { text: 'País', value: 'name' },
      { text: 'Ouro', value: 'gold' },
      { text: 'Prata', value: 'silver' },
      { text: 'Bronze', value: 'bronze' },
      { text: 'Total', value: 'total' },
      { text: 'Ações', value: 'action', sortable: false },
    ];

    const openModal = (country = null) => {
      selectedCountry.value = country
        ? { ...country }
        : { name: '', gold: 0, silver: 0, bronze: 0, total: 0 };
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const saveCountry = (country) => {
      const originalIndex = countries.value.findIndex(p => p.name === country.name);
      if (originalIndex !== -1) {
        countries.value[originalIndex] = {
          ...country,
          total: country.gold + country.silver + country.bronze,
        };
      } else {
        countries.value.push({
          ...country,
          total: country.gold + country.silver + country.bronze,
        });
      }
      sortCountries(); // Reordenar a lista após a edição
      closeModal();
    };

    return {
      headers,
      countries,
      showModal,
      selectedCountry,
      openModal,
      closeModal,
      saveCountry,
    };
  },
};
</script>

<style scoped>
.v-card {
  max-width: 1000px;
  margin: auto;
  margin-top: 20px;
}

.v-btn {
  margin: 10px;
}
</style>
