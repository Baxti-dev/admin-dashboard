
    // Function to handle moving to the next tab
    document.getElementById('next').addEventListener('click', function (event) {
        event.preventDefault();

        var type = document.getElementById('type').value;
        var name = document.getElementById('name').value;
        var price = document.getElementById('price').value;
        var productInfo = document.getElementById('productInfo').value;

        var mainImageFile = document.getElementById('picture__input1').files[0];
        var mainImageURL = mainImageFile ? URL.createObjectURL(mainImageFile) : '';

        var additionalFiles = [];
        for (var i = 2; i <= counter; i++) {
            var fileInput = document.getElementById('picture__input' + i);
            if (fileInput && fileInput.files.length > 0) {
                additionalFiles.push(fileInput.files[0]);
            }
        }

        var imagesHTML = '';
        additionalFiles.forEach(function (file) {
            var imgURL = URL.createObjectURL(file);
            imagesHTML += `
                <a href="${imgURL}" target="_blank">
                    <img src="${imgURL}" alt="">
                </a>
            `;
        });

        var productInfoDiv = document.getElementById('productInfoDiv');
        productInfoDiv.innerHTML = `
            <div class="container">
                <div class="productInfo__content">
                    <div class="productInfo__block">
                        <div class="gsap__title">
                            <img class="productMainImage" src="${mainImageURL}" alt="">
                        </div>
                        <div class="gsap__text" id="lightgallery">
                            ${imagesHTML}
                        </div>
                    </div>
                    <div id="products">
                        <div class="productadd">
                            <img class="gsap__txt" src="${mainImageURL}" alt="Product1">
                            <h2 class="fresh__img">${name}</h2>
                            <h5 class="fresh-bg">Подробно</h5>
                            <p><strong>Тип продукта:</strong> ${type}</p>
                            <div class="price-chenger fresh-bg2">
                                <p><span class="total-price">${price}</span> сум</p>
                                <p style="display: none;"><span class="unit-price" data-price="${price}">${price}</span></p>
                                <div class="products__info">
                                    <h3><span>За калограм</span> Оптом сумма</h3>
                                    <h6>${productInfo}</h6>
                                </div>
                                <div class="quantity-controls">
                                    <button onclick="changeProductQuantity(this, -1)">-</button>
                                    <input type="text" class="quantity" value="1" min="1" onchange="updateProductQuantity(this)">
                                    <button onclick="changeProductQuantity(this, 1)">+</button>
                                </div>
                            </div>
                            <button onclick="addToCart(this)">Добавить корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('firstStage').classList.remove('show');
        document.getElementById('secondStage').classList.add('show');
    });



    // Function to go back to the first tab
    document.getElementById('prev').addEventListener('click', function (event) {
        event.preventDefault();

        document.getElementById('secondStage').classList.remove('show');
        document.getElementById('firstStage').classList.add('show');
    });


    $(function () {


        /*
        * International Telephone Input v16.0.0
        * https://github.com/jackocnr/intl-tel-input.git
        * Licensed under the MIT license
        */
        var input = document.querySelectorAll("input[name=leyka_donor_phone]");
        var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');
        if (iti_el.length) {
            iti.destroy();

            // Get the current number in the given format



        }
        for (var i = 0; i < input.length; i++) {
            iti = intlTelInput(input[i], {
                autoHideDialCode: false,
                autoPlaceholder: "aggressive",
                initialCountry: "auto",
                separateDialCode: true,
                preferredCountries: ['ru'],
                customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                    return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
                },
                geoIpLookup: function (callback) {
                    $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                },
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for 
            });


            $('input[name="leyka_donor_phone"]').on("focus click countrychange", function (e, countryData) {

                var pl = $(this).attr('placeholder') + '';
                var res = pl.replace(/X/g, '9');
                if (res != 'undefined') {
                    $(this).inputmask(res, { placeholder: "X", clearMaskOnLostFocus: true });
                }
            });

            $('input[name="leyka_donor_phone"]').on("focusout", function (e, countryData) {
                var intlNumber = iti.getNumber();
                console.log(intlNumber);
            });

        }


    })
