<template>
  <div class="header__user">
    <base-dropdown
      :dropdown-style="dropdownStyles"
      :items="dropdownItems"
      :trigger-click="isMobile"
    >
      <base-avatar :src="userAvatar"></base-avatar>
    </base-dropdown>

    <input
      type="file"
      ref="input"
      class="header__user-input"
      @change="handleUploadFile"
    />

    <base-modal-wrapper>
      <confirm-modal
        v-if="isDeleteAvatarOpen"
        content="Are you sure? Do you wanna delete your avatar?"
        :loading="deleteAvatarLoading"
        @submit="handleDeleteAvatarOk"
        @close="handleDeleteAvatarCancel"
      ></confirm-modal>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <user-name-edit
        v-if="isNameOpen"
        @close="handleEditNameClose"
      ></user-name-edit>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <user-password-edit
        v-if="isPasswordOpen"
        @close="handleEditPasswordClose"
      ></user-password-edit>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <user-email-edit
        v-if="isEmailOpen"
        @close="handleEditEmailClose"
      ></user-email-edit>
    </base-modal-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';

// Components
import BaseDropdown from '@/components/UI/BaseDropdown.vue';
import BaseAvatar from '@/components/UI/BaseAvatar.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import UserNameEdit from '@/components/modals/UserNameEdit.vue';
import UserPasswordEdit from '@/components/modals/UserPasswordEdit.vue';
import UserEmailEdit from '@/components/modals/UserEmailEdit.vue';

// Utils
import { compressImage } from '@/utils';

// Constants
import { maxFileSize } from '@/constants';

export default {
  components: {
    ConfirmModal,
    BaseDropdown,
    BaseAvatar,
    BaseModalWrapper,
    UserNameEdit,
    UserPasswordEdit,
    UserEmailEdit,
  },
  data() {
    return {
      isDeleteAvatarOpen: false,
      isNameOpen: false,
      isPasswordOpen: false,
      isEmailOpen: false,
    };
  },
  computed: {
    ...mapGetters('user', ['userAvatar', 'deleteAvatarLoading']),
    ...mapGetters('ui', ['isMobile']),
    dropdownStyles() {
      return {
        right: '-0.4rem',
        width: '10.5rem',
      };
    },
    dropdownItems() {
      return [
        {
          name: 'Upload Avatar',
          icon: 'AddCameraIcon',
          action: this.handleUploadAvatar,
        },
        {
          name: this.userAvatar ? 'Delete Avatar' : '',
          icon: 'DeleteIcon',
          action: this.handleDeleteAvatar,
        },
        { name: 'Name', icon: 'EditIcon', action: this.handleEditName },
        { name: 'Password', icon: 'EditIcon', action: this.handleEditPassword },
        { name: 'Email', icon: 'EditIcon', action: this.handleEditEmail },
      ];
    },
  },
  methods: {
    ...mapActions('user', ['uploadAvatar', 'deleteAvatar']),
    handleUploadAvatar() {
      this.$refs.input.click();
    },
    async handleUploadFile(e) {
      const file = e.target.files[0];

      if (!file || !file.type.includes('image')) {
        return toast('The file should be an image.', {
          type: 'error',
          hideProgressBar: true,
        });
      }

      const compressedFile = await compressImage(file, {
        quality: 0.6,
        type: file.type,
      });

      if (compressedFile.size > maxFileSize) {
        return toast('The file should be less than 3MB', {
          type: 'error',
          hideProgressBar: true,
        });
      }

      await this.uploadAvatar(compressedFile);
    },
    handleDeleteAvatar() {
      this.isDeleteAvatarOpen = true;
    },
    handleDeleteAvatarCancel() {
      this.isDeleteAvatarOpen = false;
    },
    async handleDeleteAvatarOk() {
      await this.deleteAvatar();

      this.handleDeleteAvatarCancel();
    },
    handleEditName() {
      this.isNameOpen = true;
    },
    handleEditNameClose() {
      this.isNameOpen = false;
    },
    handleEditPassword() {
      this.isPasswordOpen = true;
    },
    handleEditPasswordClose() {
      this.isPasswordOpen = false;
    },
    handleEditEmail() {
      this.isEmailOpen = true;
    },
    handleEditEmailClose() {
      this.isEmailOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
.header__user-input {
  display: none;
  opacity: 0;
}
</style>
