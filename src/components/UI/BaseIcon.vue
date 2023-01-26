<template>
  <component :is="name"></component>
</template>

<script>
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import AgendaViewIcon from '@/components/icons/AgendaViewIcon.vue';
import ColumnViewIcon from '@/components/icons/ColumnViewIcon.vue';
import GridViewIcon from '@/components/icons/GridViewIcon.vue';
import FilterIcon from '@/components/icons/FilterIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import AttachmentIcon from '@/components/icons/AttachmentIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import AddPhotoIcon from '@/components/icons/AddPhotoIcon.vue';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon.vue';
import BurgerMenuIcon from '@/components/icons/BurgerMenuIcon.vue';
import CheckmarkIcon from '@/components/icons/CheckmarkIcon.vue';
import ExpandIcon from '@/components/icons/ExpandIcon.vue';
import TagIcon from '@/components/icons/TagIcon.vue';
import ChecklistIcon from '@/components/icons/ChecklistIcon.vue';

export default {
  components: {
    LogoutIcon,
    PlusIcon,
    SearchIcon,
    AgendaViewIcon,
    GridViewIcon,
    ColumnViewIcon,
    FilterIcon,
    CommentIcon,
    AttachmentIcon,
    CloseIcon,
    MenuIcon,
    DeleteIcon,
    EditIcon,
    AddPhotoIcon,
    ArrowBackIcon,
    BurgerMenuIcon,
    CheckmarkIcon,
    ExpandIcon,
    TagIcon,
    ChecklistIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
