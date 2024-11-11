class GetDesign {
  constructor() {
    this.images = []; 
  }

  async getDesign(event) {
    event.preventDefault(); 

    const squareFeet = document.getElementById("square-feet").value;
    const floor = document.getElementById("floors").value;
    const facing = document.getElementById("facing").value;

    if (!squareFeet || !floor || !facing) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/getDesign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          squareFeet: squareFeet,
          floor: floor,
          facing: facing,
        }),
      });

      const data = await response.json();
      if (data.length > 0) {
        localStorage.setItem(
          "designImages",
          JSON.stringify(data.map((item) => item.image))
        );
        window.location.href = "design.html";
      } else {
        alert("No design found for the selected options");
      }
    } catch (error) {
      console.error("Error fetching design:", error);
    }
  }
}

const design = new GetDesign();
document
  .querySelector(".getDesign")
  .addEventListener("submit", (event) => design.getDesign(event));
