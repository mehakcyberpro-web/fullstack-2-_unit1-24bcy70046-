class Solution(object):
    def largestRectangleArea(self, hei):
        stack = []
        maxArea = 0 
        n = len(hei)

        for i in range(n):
            while stack and hei[stack[-1]] > hei[i]:
                h=hei[stack.pop()]
                if stack:
                    width=i-stack[-1] - 1
                else:
                    width=i
                maxArea=max(maxArea, h * width)
            stack.append(i)
        while stack:
            h = hei[stack.pop()]
            if stack:
                width=n-stack[-1] - 1
            else:
                width=n
            maxArea=max(maxArea, h * width )
        return maxArea                        
