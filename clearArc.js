export default async function clearArc(x,y,size){
    await ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    await ctx.beginPath();
    await ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    await ctx.fill();
    await ctx.restore();
}