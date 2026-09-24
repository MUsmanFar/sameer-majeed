
import sys
import cv2
import numpy as np

def make_transparent(input_path, output_path, bg_color='black', tolerance=28):
    # Read image
    bgr = cv2.imread(input_path)
    if bgr is None:
        print(f"Error: could not read {input_path}")
        return False
    
    h, w = bgr.shape[:2]
    
    if bg_color == 'black':
        # Calculate max intensity across channels
        intensity = np.max(bgr, axis=2)
        # Seed mask for floodFill: size must be (h+2, w+2)
        mask = np.zeros((h + 2, w + 2), dtype=np.uint8)
        
        # We floodfill from the four corners and edge midpoints
        seeds = [
            (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
            (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)
        ]
        
        # Create a binary threshold image where background is dark
        bg_candidate = (intensity <= tolerance).astype(np.uint8) * 255
        
        # Flood fill connected background from seeds
        connected_bg = np.zeros((h, w), dtype=np.uint8)
        for sx, sy in seeds:
            if intensity[sy, sx] <= tolerance + 15:
                # floodFill on single channel
                temp_mask = np.zeros((h + 2, w + 2), dtype=np.uint8)
                cv2.floodFill(intensity, temp_mask, (sx, sy), 0, loDiff=tolerance, upDiff=tolerance)
                connected_bg = np.maximum(connected_bg, (temp_mask[1:-1, 1:-1] == 1).astype(np.uint8) * 255)
        
        # Soft transition for alpha:
        # Distance transform or smooth ramp
        alpha = np.full((h, w), 255, dtype=np.uint8)
        
        # For connected background pixels, set alpha = 0
        is_bg = (connected_bg > 0)
        
        # Smooth boundary
        # Dilate the background slightly to find edges
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        bg_dilated = cv2.dilate(is_bg.astype(np.uint8), kernel)
        edge_zone = (bg_dilated > 0) & (~is_bg | (intensity <= tolerance + 15))
        
        alpha[is_bg] = 0
        
        # In edge zone, smooth alpha based on intensity
        ramp_low = 5
        ramp_high = tolerance + 15
        edge_alpha = np.clip((intensity.astype(float) - ramp_low) / (ramp_high - ramp_low), 0.0, 1.0) * 255.0
        alpha[edge_zone] = np.minimum(alpha[edge_zone], edge_alpha[edge_zone].astype(np.uint8))
        
        # Also clean up unlit faint black corners
        alpha[intensity <= 6] = 0
        
    # Convert BGR to BGRA
    bgra = cv2.cvtColor(bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    
    cv2.imwrite(output_path, bgra)
    print(f"Saved: {output_path}")
    return True

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python make_transparent.py <input_jpg> <output_png> [bg_color] [tolerance]")
        sys.exit(1)
    inp = sys.argv[1]
    out = sys.argv[2]
    bg = sys.argv[3] if len(sys.argv) > 3 else 'black'
    tol = int(sys.argv[4]) if len(sys.argv) > 4 else 28
    make_transparent(inp, out, bg, tol)
