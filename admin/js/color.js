$(document).ready(function () {
    let contentColorList = ""
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/color"
    }).done(function (result) {
        let stt = 1;
        $.each(result.data, function (index, currentItem) {
            contentColorList += `<tr>
        <td> ${stt} </td>
        <td> ${currentItem.id} </td>
        <td> ${currentItem.name} </td>
        <td>
          <button type="submit" class="btn btn-primary mr-2">Edit</button>
          <button type="submit" class="btn btn-primary mr-2">Delete</button>
        </td>
      </tr>`
            stt++;
        })
        $("#list-color").html(contentColorList)
    })
    $(".btn-create").click(function () {
        let textColorName = $(".text-colorname").val()
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/color/add",
            data: {
                colorName: textColorName
            }
        }).done(function (result) {
            if (result.data == true) {
                bootbox.alert("Save successfully !", function () {
                    location.reload();
                });
            } else {
                bootbox.alert(textColorName + " have existed already. Please type another color !", function () {
                    location.reload();
                });
            }
        })
    })


})