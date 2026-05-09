function deleteProduct(id) {
    const result = confirm("Are you sure you want to delete this product?");
    if (result) {
        // We send a POST request to the delete route
        fetch("/delete-product/" + id, {
            method: "POST", 
        }).then((res) => {
            if (res.ok) {
                // Refresh the page only AFTER the server confirms deletion
                location.reload();
            }
        });
    }
}