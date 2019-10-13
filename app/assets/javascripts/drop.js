$(document).on('turbolinks:load', function() {
  var dropzone = $('dropzone-area');
  var preview = $('#preview');
  var images = [];
  var inputs = [];
  var input_area = $('.input_area')

  // input[type="file"]タグの要素が変化した(画像がアップロードされた)タイミングで発火させる
  $(document).on('change', 'input[type="file"].upload-image', function(event) {
    // アップロードされた画像ファイル(ファイルオブジェクト)の属性値(filesプロパティ)を取得する
    var file = $(this).prop('files')[0];
    // FileReaderオブジェクトをインスタンス化する
    var reader = new FileReader();
    // ファイルオブジェクトをinputsへ代入
    inputs.push($(this));
    var img = $(`<div class = "img_view"><img></div>`);
    // FileReaderオブジェクトに画像ファイルが読み込まれたタイミングで発火させる
    reader.onload = function(e) {
      var btn_wrapper = $('<div class="btn_wrapper"><div class="btn edit">編集</div><div class="btn delete">削除</div></div>');
      // img(親要素)へbtn_wrapperを子要素として追加する
      img.append(btn_wrapper)
      // img変数に定義している、divタグ内imgタグを取得する
      // 取得したimgタグのsrcプロパティへ、アップした画像を入れ込む
      img.find('img').attr({
        // 画像を表示するためData URIスキームをsrcプロパティへセットする
        src: e.target.result
      })
    }

     // FileReaderオブジェクトへ属性値(filesプロパティ)を代入する
    reader.readAsDataURL(file);
    images.push(img);

    $.each(images, function(index, image){
      image.attr('data-image', index);
      preview.append(image);
    })

    var new_image = $(`<input style="display: none;" name="item[item_images_attributes][${images.length}][image]" id="upload-image" class="upload-image" data-image= ${images.length} type="file">`);
    // 同じidを持つinputタグがあった場合、先に存在している方のみ読まれるため、input_areaの先頭にinput type=fileを追加するため、appendではなくprependメソッドを使う
    input_area.prepend(new_image);
  })
  $(document).on('click', '.delete', function() {
    var target_image = $(this).parent().parent();
    // 現在アップロードされている画像をeachで回して、クリックされた画像と一致したものを削除する
    $.each(inputs, function(index, input){
      if ($(this).data('image') == target_image.data('image')){
        // Number($(this).parent().parent().attr("data-image"))
        // ファイルオブジェクトを削除する
        // $(this).remove();
        debugger
        $(this).remove();
        // プレビュー表示する要素を削除する
        target_image.remove();
        var num = $(this).data('image');
        // 配列から該当画像データを削除する
        images.splice(num, 1);
        inputs.splice(num, 1);
        // アップされている画像データの数が0の場合、inputタグへdata-image: 0を付与する
        if(inputs.length == 0) {
          $('input[type="file"].upload-image').attr({
            'name': `item[item_images_attributes][${images.length}][image]`,
            'data-image': 0
          })
        }
      }
    })
    // 指定要素の最初を対象に、data-imageを付与する
    $('input[type="file"].upload-image').first().attr({
      'name': `item[item_images_attributes][${images.length}][image]`,
      'data-image': inputs.length
    })
    $.each(inputs, function(index, input) {
      var input = $(this)
      input.attr({
        'name': `item[item_images_attributes][${index}][image]`,
        'data-image': index
      })
      $('input[type="file"].upload-image').first().after(input)
    })
  })
});


// アップロード即時プレビュー画像表示サンプルコード
// window.onload = function () {
//   var formData = new FormData();
//   var dropZone = document.getElementById("drop_zone");

//   dropZone.addEventListener("dragover", function(e) {
//     e.stopPropagation();
//     e.preventDefault();
  
//     this.style.background = "#ff3399";
//   }, false);

//   dropZone.addEventListener("dragleave", function(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     this.style.background = "#ffffff";
//   }, false);

//   dropZone.addEventListener("drop", function(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     this.style.background = "#ffffff";

//     var files = e.dataTransfer.files;
//     for (var i = 0; i < files.length; i++) {
//       (function() {
//         var fr = new FileReader();
//         fr.onload = function() {
//           var div = document.createElement('div');

//           var img = document.createElement('img');
//           img.setAttribute('src', fr.result);
//           div.appendChild(img);

//           var preview = document.getElementById("preview");
//           debugger
//           preview.appendChild(div);
//         };
//         fr.readAsDataURL(files[i]);
//       })();

//       formData.append("file", files[i]);
//     }
//   }, false);


//   var postButton = document.getElementById("post");
//   postButton.addEventListener("click", function() {
//     var request = new XMLHttpRequest();
//     request.open("POST", "POST_URL");
//     request.send(formData);
//   });
// };