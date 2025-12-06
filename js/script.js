// --- 1. KHAI BÁO BIẾN TOÀN CỤC ---
let cart = []; // Mảng chứa các món hàng đã mua

// --- 2. XỬ LÝ SỰ KIỆN KHI TRANG TẢI XONG ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- PHẦN TÌM KIẾM ---
    const searchIcon = document.querySelector('.fa-search');
    const searchBox = document.querySelector('#search-box');
    const closeSearch = document.querySelector('#close-search');
    const searchInput = document.querySelector('#search-input');

    // Bấm kính lúp -> Hiện ô tìm kiếm
    searchIcon.addEventListener('click', () => {
        searchBox.classList.add('active');
        searchInput.focus(); // Tự động đặt trỏ chuột vào ô nhập
    });

    // Bấm dấu X -> Ẩn ô tìm kiếm
    closeSearch.addEventListener('click', () => {
        searchBox.classList.remove('active');
    });

    // Gõ chữ -> Lọc sản phẩm
    searchInput.addEventListener('keyup', function() {
        const value = this.value.toLowerCase(); // Chuyển chữ về thường
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const name = product.querySelector('h4').innerText.toLowerCase();
            // Nếu tên sản phẩm chứa từ khóa -> Hiện, ngược lại -> Ẩn
            if (name.includes(value)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });


    // --- PHẦN GIỎ HÀNG ---
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartSidebar = document.querySelector('#cart-sidebar');
    const closeCart = document.querySelector('#close-cart');
    const buyButtons = document.querySelectorAll('.buy-btn');

    // Bấm icon giỏ hàng -> Mở sidebar
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        renderCart(); // Vẽ lại giỏ hàng
    });

    // Bấm dấu X -> Đóng sidebar
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Bấm nút Mua ngay -> Thêm vào mảng cart
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const name = productCard.querySelector('h4').innerText;
            const priceText = productCard.querySelector('.price').childNodes[0].nodeValue.trim(); // Lấy giá (bỏ phần giảm giá)
            const img = productCard.querySelector('img').src;
            const sizeSelect = productCard.querySelector('select');
            const size = sizeSelect ? sizeSelect.value : 'N/A';

            // Tạo đối tượng sản phẩm
            const product = {
                name: name,
                price: priceText,
                size: size,
                img: img
            };

            // Thêm vào giỏ
            cart.push(product);

            // Thông báo nhỏ (thay vì alert)
            alert(`✅ Đã thêm: ${name} (Size: ${size}) vào giỏ!`);
            
            // Cập nhật số lượng trên icon (nếu muốn làm thêm sau này)
        });
    });
});


// --- 3. HÀM VẼ LẠI GIỎ HÀNG (RENDER) ---
function renderCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalElement = document.querySelector('#cart-total');
    
    // Xóa nội dung cũ
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Giỏ hàng đang trống!</p>';
        cartTotalElement.innerText = '$0.00';
        return;
    }

    let total = 0;

    // Duyệt qua từng món trong giỏ để tạo HTML
    cart.forEach((item, index) => {
        // Xử lý giá tiền (bỏ dấu $ để tính toán)
        const priceNumber = parseFloat(item.price.replace('$', ''));
        total += priceNumber;

        const html = `
            <div class="cart-item">
                <div class="cart-item-img" style="width: 50px; height: 50px; overflow: hidden; margin-right: 10px;">
                    <img src="${item.img}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="cart-item-info" style="flex: 1;">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <div class="cart-item-remove">
                    <i class="fas fa-trash" onclick="removeItem(${index})" style="color: red; cursor: pointer;"></i>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += html;
    });

    // Cập nhật tổng tiền
    cartTotalElement.innerText = '$' + total.toFixed(2);
}

// --- 4. HÀM XÓA SẢN PHẨM KHỎI GIỎ ---
function removeItem(index) {
    cart.splice(index, 1); // Xóa 1 phần tử tại vị trí index
    renderCart(); // Vẽ lại giao diện
}

// --- 5. LỌC ADIDAS/NIKE (Code cũ giữ lại) ---
function filterProduct(category) {
    const allProducts = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    allProducts.forEach(product => product.style.display = 'none');
    
    // Nếu đang tìm kiếm thì phải lọc theo cả từ khóa nữa (Nâng cao), 
    // nhưng ở đây mình reset lại để hiện theo category cho đơn giản
    const selectedProducts = document.querySelectorAll('.' + category);
    selectedProducts.forEach(product => product.style.display = 'block');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Active button logic
    if (category === 'adidas') {
        // Tìm nút chứa text ADIDAS
        Array.from(buttons).find(b => b.textContent.includes('ADIDAS')).classList.add('active');
    } else {
        Array.from(buttons).find(b => b.textContent.includes('NIKE')).classList.add('active');
    }
}
