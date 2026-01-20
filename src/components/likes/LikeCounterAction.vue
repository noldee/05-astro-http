<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likesPost">Like this Post</button>
  <button v-else @click="likesPost">
    Like <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import confetti from "canvas-confetti";
import debounce from "lodash.debounce";
import { actions } from "astro:actions";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(async () => {
    // fetch(`/api/posts/likes/${props.postId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ likes: likeClicks.value }),
    // });

    await actions.updatePostLike({
      postId: props.postId,
      increment: likeClicks.value,
    });

    likeClicks.value = 0;
  }, 500),
);

const likesPost = async () => {
  likeCount.value++;
  likeClicks.value++;

  // const { data, error } = await actions.getGreeting({
  //   age: 19,
  //   name: "Walter",
  //   isActive: true,
  // });

  // if (error) {
  //   return alert("Algo salio mal");
  // }


  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};

const getCurrentLikes = async () => {
  const { data, error } = await actions.getPostLikes(props.postId);

  if (error) {
    return alert(error);
  }

  // const resp = await fetch(`/api/posts/likes/${props.postId}`);
  // if (!resp.ok) return;
  // const data = await resp.json();

  likeCount.value = data.likes;
  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: "Segoe UI", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(94, 81, 188, 0.39);
  transition: all 0.2s ease;
  outline: none;
}

button:hover {
  background-color: #4a3f9a;
  box-shadow: 0 6px 20px rgba(94, 81, 188, 0.45);
}
</style>
