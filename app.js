document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".share-button").forEach((button) => {
  const idleText = button.textContent;

  button.addEventListener("click", async () => {
    const shareData = {
      title: button.dataset.shareTitle || document.title,
      text: button.dataset.shareText || "",
      url: button.dataset.shareUrl || window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      button.textContent = "已複製";
      setTimeout(() => {
        button.textContent = idleText;
      }, 1600);
    } catch (error) {
      button.textContent = idleText;
    }
  });
});
