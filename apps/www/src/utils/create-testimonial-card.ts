import type { TestimonialType } from "~/types";

const waitForImageLoad = (imgElement: HTMLImageElement) => {
  return new Promise<void>((resolve, reject) => {
    if (imgElement.complete) {
      resolve();
    } else {
      imgElement.onload = () => resolve();
      imgElement.onerror = () => reject(new Error("Image failed to load"));
    }
  });
};

export const createSocialCard = async (data: TestimonialType) => {
  const container = document.createElement("div");
  container.className = "max-w-lg";

  const card = document.createElement("div");
  card.className = "bg-gray-900 text-white p-6 rounded-xl space-y-4";

  const header = document.createElement("div");
  header.className = "flex items-center justify-between";

  const imagePromises = [];
  const userInfo = document.createElement("div");
  userInfo.className = "flex items-center gap-3";

  const avatar = document.createElement("img");
  avatar.className = "w-10 h-10 rounded-full";
  avatar.src = data.profileImages ?? "https://via.placeholder.com/150.jpg";
  avatar.alt = "User avatar";
  avatar.crossOrigin = "anonymous";

  const userMeta = document.createElement("div");
  const username = document.createElement("div");
  username.className = "font-semibold";
  username.textContent = data.authorName || "Anonymous";

  const date = document.createElement("div");
  date.className = "text-sm text-gray-400";
  date.textContent = new Date().toLocaleDateString();

  userMeta.appendChild(username);
  userMeta.appendChild(date);

  userInfo.appendChild(avatar);
  userInfo.appendChild(userMeta);

  imagePromises.push(waitForImageLoad(avatar));
  const closeButton = document.createElement("button");
  closeButton.className = "text-gray-400 hover:text-white";
  closeButton.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;

  header.appendChild(userInfo);

  const content = document.createElement("div");
  content.className = "space-y-4";

  const text = document.createElement("p");
  text.className = "text-gray-300";
  text.textContent = data.message;
  content.appendChild(text);

  if (data.reviewImages) {
    const image = document.createElement("img");
    image.className = "w-full h-64 object-cover rounded-lg";
    image.crossOrigin = "anonymous";
    image.src = data.reviewImages;
    image.alt = "Post image";
    content.appendChild(image);
    imagePromises.push(waitForImageLoad(image));
  }

  const rating = document.createElement("div");
  rating.className = "flex gap-1 items-center ";

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.className = i < 2 ? "text-yellow-400" : "text-gray-600";
    star.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    `;
    rating.appendChild(star);
  }

  const actions = document.createElement("div");
  actions.className = "flex gap-4 pt-2 border-t border-gray-700";

  const actionButtons = [
    {
      text: "Share",
      icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
    },
    {
      text: "Download",
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    },
    {
      text: "Copy to clipboard",
      icon: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3",
    },
  ];

  actionButtons.forEach(({ text, icon }) => {
    const button = document.createElement("button");
    button.className = "flex items-center gap-2 text-gray-400 hover:text-white";
    button.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
      </svg>
      <span>${text}</span>
    `;
    actions.appendChild(button);
  });

  card.appendChild(header);
  card.appendChild(content);
  card.appendChild(rating);

  container.appendChild(card);

  await Promise.all(imagePromises);

  return container;
};
