

// let listCategory = "";

// $(document).ready(function() {

// $.ajax({
//     method: 'GET',
//     contentType: "application/json",
//     url: "http://localhost:8080/category",
//     dataType: 'json',
//     async : false,
//     success: function(response) {

//         listCategory = response.data;

//        // Duyệt qua từng phần tử trong data và thêm vào bảng
//         $.each(listCategory, function(index, category) {
//             var row = '<tr>' +
//                 '<td id="cateidtb">' + category.id + '</td>' +
//                 '<td>'  +category.name + '</td>' +
//                ' <td>'+
//                             '<button type="submit" onclick="editRow(this)" class="btn btn-primary mr-2" id="btnedit">Edit</button>'+
//                           '</td>'
//                 '</tr>';
//             $('#categorytable tbody').append(row);
//         });
//         // listCategory.map(function(currentItem,index){
//         //     var row = '<tr>' +
//         //     '<td>' + currentItem.id + '</td>' +
//         //     '<td>' + currentItem.name + '</td>' +
//         //     '</tr>';
//         // $('#myTable tbody').append(row);
//         // })
//     },
//     error: function(xhr, status, error) {
//         console.log(error); // Xử lý lỗi nếu có
//     }
// });
// // $('#btncreate').click(function(event) {

// //     var CategoryName = $("#CategoryName").val()
// //     console.log("checkCateName: "+CategoryName)
// //     let formIsValue = true

// //     let CategoryNameWarning = $("#CategoryName-warning")
// //         if(CategoryNameWarning==""){
// //             formIsValue = false;
// //             CategoryNameWarning.text("The categoryName is not empty!")
// //             CategoryNameWarning.removeClass("d-none")
// //         }else{
// //           CategoryNameWarning.addClass("d-none")

// //       }
// //     $.ajax({
// //       type: 'POST',
// //       url: 'http://localhost:8080/category/create',
// //       data: 
// //           {
// //               CategoryName:CategoryName
// //           },
     
// //       success: function(response) {
// //           console.log("check response :",response)
// //           bootbox.alert("thêm dữ liệu thành công");
// //           console.log('Thêm dữ liệu thành công!');
// //       },
// //       error: function(xhr, status, error) {
// //         console.error(error);
// //         alert("thêm dữ liệu thất bại")
// //       }
// //     });

// //   });
// $("btncreate").click(function () {
//   var catename = $("#CategoryName").val()
//   console.log("checkCateName: "+catename)
//   // $.ajax({
//   //     method: "POST",
//   //     url: "http://localhost:8080/category/add",
//   //     data: {
//   //         catename: catename
//   //     }
//   // }).done(function (result) {
//   //     bootbox.alert(result.data, function () {
//   //         location.reload();
//   //     });
//   // })
// }) 
//   $('#btnupdate').click(function() {
//     var CategoryId = $("#CategoryId").val()
//     console.log("checkCateId: "+CategoryId)
//     var CategoryName = $("#CategoryName").val()
//     console.log("checkCateName: "+CategoryName)

//     $.ajax({
//       type: 'POST',
//       url: 'http://localhost:8080/category/update',
//       data: 
//           {
//               CategoryId:CategoryId,
//               CategoryName:CategoryName
//           },
     
//       success: function(response) {
//           console.log("check response :",response)

//         alert("sửa dữ liệu thành công")
//         console.log('sửa dữ liệu thành công!');
//       },
//       error: function(xhr, status, error) {
//         console.error(error);
//         alert("sửa dữ liệu thất bại")
//       }
//     });
//   });
//   $('#btndelete').click(function() {
 
//     var CategoryId = $("#CategoryId").val()
//     console.log("checkCateId: "+CategoryId)
    
//     $.ajax({
//       type: 'POST',
//       url: 'http://localhost:8080/category/delete',
//       data: 
//           {
//               CategoryId:CategoryId
//           },
     
//       success: function(response) {
//           console.log("check response :",response)

         

//         alert("xóa dữ liệu thành công");
//         console.log('xóa dữ liệu thành công!');
//       },
//       error: function(xhr, status, error) {
//         console.error(error);
//         alert("xóa dữ liệu thất bại")
//       }
//     });
//   });
 
// });

// function editRow(button) {
//     var row = button.parentNode.parentNode; // Lấy hàng chứa nút "Edit"
//     document.getElementById("CategoryId").value = row.cells[0].textContent;
//     document.getElementById("CategoryName").value = row.cells[1].textContent;
//     // document.getElementById("CategoryID").setAttribute("disabled", true);

// }



// Bách
$(document).ready(function () {
  let contentColorList = ""
  $.ajax({
      method: "GET",
      url: "http://localhost:8080/category"
  }).done(function (result) {
      let stt = 1;
      $.each(result.data, function (index, currentItem) {
          contentColorList += `<tr>
      <td> ${stt} </td>
      <td> ${currentItem.id} </td>
      <td> ${currentItem.name} </td>
      <td>
        <button type="submit" category-id="${currentItem.id}" class="btn btn-primary mr-2 btn-delete">Delete</button>
      </td>
    </tr>`
          stt++;
      })
      $("#list-category").html(contentColorList)
      $(".btn-delete").click(function () {
          let categoryID = $(this).attr("category-id")
          let This = $(this)
          $.ajax({
              method: "GET",
              url: "http://localhost:8080/category/delete?id=" + categoryID
          }).done(function (result) {
              if (result.data == true) {
                  bootbox.alert("Delete successfully", function () {
                  });
                  This.closest("tr").remove();
              }
              else {
                  bootbox.alert("Delete successfully !")
              }
          })
      })
  })
  $(".btn-create").click(function () {
      let textcatename = $("#CategoryName").val()
      console.log(textcatename);
      $.ajax({
          method: "POST",
          url: "http://localhost:8080/category/add",
          data: {
              catename: textcatename
          }
      }).done(function (result) {
          bootbox.alert(result.data, function () {
              location.reload();
          });
      })
  })    
})