"use strict";

var data = [{
  country: "China",
  value: 1408.7
}, {
  country: "USA",
  value: 518.7
}, {
  country: "Germany",
  value: 147.7
}, {
  country: "Japan",
  value: 136.1
}, {
  country: "S. Korea",
  value: 114.6
}, {
  country: "India",
  value: 77.3
}, {
  country: "France",
  item: 74.2
}, {
  country: "Taiwan",
  value: 71.5
}, {
  country: "Brazil",
  value: 59.7
}, {
  country: "Italy",
  value: 51.9
}];

var width = 600;
var height = 600;
var colors = {
  high: '#e91e5b',
  base: '#5e81bc',
  txtHigh: 'rgba(249, 212, 15, 0.83)',
  txtBase: 'rgba(255,255,255,.77)'
};
var svg = d3.select('#target').attr('width', width).attr('height', height);

var pack = d3.pack().size([width, height]).padding(5);

var root = d3.hierarchy({ children: data }).sum(function (d) {
  return d.value;
});

var node = svg.selectAll(".node").data(pack(root).leaves()).enter().append("g").attr("class", "node").attr("transform", function (d) {
  return "translate(" + d.x + "," + d.y + ")";
});

node.append("circle").attr("id", function (d) {
  return d.data.country;
}).attr("r", function (d) {
  return d.r;
}).style("fill", function (d) {
  return isChina(d) ? colors.high : colors.base;
});

node.append("clipPath").attr("id", function (d) {
  return "clip-" + d.data.country;
}).append("use").attr("xlink:href", function (d) {
  return "#" + d.data.country;
});

node.append("text").attr('text-anchor', 'middle').attr("clip-path", function (d) {
  return "url(#clip-" + d.data.country + ")";
}).attr('fill', function (d) {
  return isChina(d) ? colors.txtHigh : colors.txtBase;
}).attr('font-size', function (d) {
  return isChina(d) ? 38 : 18;
}).selectAll("tspan").data(function (d) {
  return [d.data.country];
}).enter().append("tspan").attr("x", 0).attr("y", function (d, i, nodes) {
  return 13 + (i - nodes.length / 2 - 0.5) * 10;
}).text(function (d) {
  return d;
});

node.append("title").text(function (d) {
  return d.value;
});

function isChina(d) {
  return d.data.country === 'China';
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXBCLEdBQThCLE9BQU8sT0FBMUM7QUFBQSxDQUhsQixFQUlLLElBSkwsQ0FJVSxXQUpWLEVBSXVCO0FBQUEsU0FBSyxRQUFRLENBQVIsSUFBYSxFQUFiLEdBQWtCLEVBQXZCO0FBQUEsQ0FKdkIsRUFLRyxTQUxILENBS2EsT0FMYixFQU1HLElBTkgsQ0FNUTtBQUFBLFNBQUssQ0FBQyxFQUFFLElBQUYsQ0FBTyxPQUFSLENBQUw7QUFBQSxDQU5SLEVBT0csS0FQSCxHQU9XLE1BUFgsQ0FPa0IsT0FQbEIsRUFRSyxJQVJMLENBUVUsR0FSVixFQVFlLENBUmYsRUFTSyxJQVRMLENBU1UsR0FUVixFQVNlLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxLQUFQO0FBQUEsU0FBa0IsS0FBSyxDQUFDLElBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkIsR0FBdUIsR0FBeEIsSUFBK0IsRUFBdEQ7QUFBQSxDQVRmLEVBVUssSUFWTCxDQVVVO0FBQUEsU0FBSyxDQUFMO0FBQUEsQ0FWVjs7QUFZQSxLQUFLLE1BQUwsQ0FBWSxPQUFaLEVBQ0ssSUFETCxDQUNVLFVBQVMsQ0FBVCxFQUFZO0FBQUUsU0FBTyxFQUFFLEtBQVQ7QUFBZSxDQUR2Qzs7QUFHRixTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsU0FBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQW1CLE9BQTFCO0FBQ0QiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF0YSA9IFt7XG4gIGNvdW50cnk6IFwiQ2hpbmFcIixcbiAgdmFsdWU6IDE0MDguN1xufSwge1xuICBjb3VudHJ5OiBcIlVTQVwiLFxuICB2YWx1ZTogNTE4Ljdcbn0sIHtcbiAgY291bnRyeTogXCJHZXJtYW55XCIsXG4gIHZhbHVlOiAxNDcuNyxcbn0sIHtcbiAgY291bnRyeTogXCJKYXBhblwiLFxuICB2YWx1ZTogMTM2LjFcbn0sIHtcbiAgY291bnRyeTogXCJTLiBLb3JlYVwiLFxuICB2YWx1ZTogMTE0LjZcbn0sIHtcbiAgY291bnRyeTogXCJJbmRpYVwiLFxuICB2YWx1ZTogNzcuM1xufSwge1xuICBjb3VudHJ5OiBcIkZyYW5jZVwiLFxuICBpdGVtOiA3NC4yXG59LCB7XG4gIGNvdW50cnk6IFwiVGFpd2FuXCIsXG4gIHZhbHVlOiA3MS41XG59LCB7IFxuICBjb3VudHJ5OiBcIkJyYXppbFwiLFxuICB2YWx1ZTogNTkuN1xufSwge1xuICBjb3VudHJ5OiBcIkl0YWx5XCIsXG4gIHZhbHVlOiA1MS45XG59XTtcblxuY29uc3Qgd2lkdGggPSA2MDA7XG5jb25zdCBoZWlnaHQgPSA2MDA7XG5jb25zdCBjb2xvcnMgPSB7XG4gIGhpZ2g6ICcjZTkxZTViJyxcbiAgYmFzZTogJyM1ZTgxYmMnLFxuICB0eHRIaWdoOiAncmdiYSgyNDksIDIxMiwgMTUsIDAuODMpJyxcbiAgdHh0QmFzZTogJ3JnYmEoMjU1LDI1NSwyNTUsLjc3KSdcbn07XG5jb25zdCBzdmcgPSBkMy5zZWxlY3QoJyN0YXJnZXQnKVxuICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCk7XG5cbmNvbnN0IHBhY2sgPSBkMy5wYWNrKClcbiAgICAuc2l6ZShbd2lkdGgsIGhlaWdodF0pXG4gICAgLnBhZGRpbmcoNSk7XG5cbmNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoe2NoaWxkcmVuOiBkYXRhfSlcbiAgICAuc3VtKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudmFsdWU7IH0pO1xuXG4gIHZhciBub2RlID0gc3ZnLnNlbGVjdEFsbChcIi5ub2RlXCIpXG4gICAgLmRhdGEocGFjayhyb290KS5sZWF2ZXMoKSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZVwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZCA9PiBcInRyYW5zbGF0ZShcIiArIGQueCArIFwiLFwiICsgZC55ICsgXCIpXCIpO1xuXG4gIG5vZGUuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAuYXR0cihcImlkXCIsIGQgPT4gZC5kYXRhLmNvdW50cnkpXG4gICAgICAuYXR0cihcInJcIiwgZCA9PiBkLnIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gaXNDaGluYShkKSA/IGNvbG9ycy5oaWdoIDogY29sb3JzLmJhc2UgKTtcblxuICBub2RlLmFwcGVuZChcImNsaXBQYXRoXCIpXG4gICAgICAuYXR0cihcImlkXCIsIGQgPT4gXCJjbGlwLVwiICsgZC5kYXRhLmNvdW50cnkpXG4gICAgLmFwcGVuZChcInVzZVwiKVxuICAgICAgLmF0dHIoXCJ4bGluazpocmVmXCIsIGQgPT4gXCIjXCIgKyBkLmRhdGEuY291bnRyeSk7XG5cbiAgbm9kZS5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5hdHRyKFwiY2xpcC1wYXRoXCIsIGQgPT4gXCJ1cmwoI2NsaXAtXCIgKyBkLmRhdGEuY291bnRyeSArIFwiKVwiKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IGlzQ2hpbmEoZCkgPyBjb2xvcnMudHh0SGlnaCA6IGNvbG9ycy50eHRCYXNlIClcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCBkID0+IGlzQ2hpbmEoZCkgPyAzOCA6IDE4KVxuICAgIC5zZWxlY3RBbGwoXCJ0c3BhblwiKVxuICAgIC5kYXRhKGQgPT4gW2QuZGF0YS5jb3VudHJ5XSkgXG4gICAgLmVudGVyKCkuYXBwZW5kKFwidHNwYW5cIilcbiAgICAgIC5hdHRyKFwieFwiLCAwKVxuICAgICAgLmF0dHIoXCJ5XCIsIChkLCBpLCBub2RlcykgPT4gIDEzICsgKGkgLSBub2Rlcy5sZW5ndGggLyAyIC0gMC41KSAqIDEwKVxuICAgICAgLnRleHQoZCA9PiBkKTtcblxuICBub2RlLmFwcGVuZChcInRpdGxlXCIpXG4gICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBkLnZhbHVlfSk7XG5cbmZ1bmN0aW9uIGlzQ2hpbmEoZCkge1xuICByZXR1cm4gZC5kYXRhLmNvdW50cnkgPT09ICdDaGluYSc7XG59Il19