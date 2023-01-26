<template>
  <div class="todo-actions-bar">
    <div class="todo-actions-bar__content">
      <button class="todo-actions-bar__action" title="Label">
        <base-icon name="TagIcon" class="todo-actions-bar__action-icon"></base-icon>
      </button>

      <button class="todo-actions-bar__action" title="Check List">
        <base-icon name="ChecklistIcon" class="todo-actions-bar__action-icon"></base-icon>
      </button>

      <button class="todo-actions-bar__action" title="Attachments">
        <base-icon name="AttachmentIcon" class="todo-actions-bar__action-icon"></base-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
.todo-actions-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 6.25rem - 12.5rem);
  height: 4rem;
  background-color: #F6F7F8;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  transition: width .3s ease-in-out;

  &--menu-closed {
    width: calc(100% - 6.25rem);
  }
}
.todo-actions-bar__content {
  width: 100%;
  height: 100%;
  padding: 0.5rem 2rem;
  column-gap: 0.5rem;
  @include flex(row, center, flex-start);
}
.todo-actions-bar__action {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.todo-actions-bar__action-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: $primary-text-color;
}

@include small-desktop-media {
  .todo-actions-bar {
    width: 100%;
  }
  .todo-actions-bar__content {
    padding: 0.5rem 1.5rem;
  }
}
</style>
