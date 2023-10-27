<template>

  <div class="page row">
     <div class="col-md-10">
      
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fa-sharp fa-solid fa-arrow-rotate-left"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
       
        <button class="btn btn-sm btn-danger" @click="removeAllContacts()">
          <i class="fa-solid fa-trash-can"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        
        
        <ContactCard :contact="activeContact" />
        <router-link
          :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    //tinh toan lại kh trảd ữ liệu
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // tính toán các giá trị
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.

    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Danh sách các liên hệ đã được lọc dựa trên văn bản tìm kiếm..
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },

    activeContact() {
      //Liên hệ đang được chọn.
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
  },
  methods: {
    async retrieveContacts() {
      //lấy danh sách liên hệ từ dịch vụ  service
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      //làm mới danh sách liên hệ.
      this.retrieveContacts(); //lấy danh sách liên hệ mới.
      this.activeIndex = -1; //hủy chọn liên hệ nếu có.
    },

    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
